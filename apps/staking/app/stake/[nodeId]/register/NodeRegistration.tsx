'use client';

import { PubKey } from '@/components/PubKey';
import { formatDate, formatLocalizedRelativeTimeToNowClient } from '@/lib/locale-client';
import { ButtonDataTestId } from '@/testing/data-test-ids';
import { Loading } from '@session/ui/components/loading';
import { Button, ButtonSkeleton } from '@session/ui/ui/button';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { ActionModuleDivider, ActionModuleRow, ActionModuleRowSkeleton } from '../../ActionModule';
import { useStakingBackendQueryWithParams } from '@/lib/sent-staking-backend-client';
import type { LoadRegistrationsResponse } from '@session/sent-staking-js/client';
import { getPendingNodes } from '@/lib/queries/getPendingNodes';
import { useWallet } from '@session/wallet/hooks/wallet-hooks';
import { FEATURE_FLAG, useFeatureFlag } from '@/providers/feature-flag-provider';
import { SESSION_NODE } from '@/lib/constants';
import { formatBigIntTokenValue } from '@session/util/maths';
import { SENT_DECIMALS, SENT_SYMBOL } from '@session/contracts';
import { getDateFromUnixTimestampSeconds } from '@session/util/date';
import { Tooltip, TooltipContent, TooltipTrigger } from '@session/ui/ui/tooltip';
import { notFound } from 'next/navigation';
import { generatePendingNodes } from '@session/sent-staking-js/test';
import useRegisterNode, { type ContractWriteStatus, REGISTER_STAGE } from '@/hooks/registerNode';
import { StatusIndicator, statusVariants } from '@session/ui/components/StatusIndicator';
import type { VariantProps } from 'class-variance-authority';

export default function NodeRegistration({ nodeId }: { nodeId: string }) {
  const showMockRegistration = useFeatureFlag(FEATURE_FLAG.MOCK_REGISTRATION);
  const showOneMockNode = useFeatureFlag(FEATURE_FLAG.MOCK_PENDING_NODES_ONE);
  const showTwoMockNodes = useFeatureFlag(FEATURE_FLAG.MOCK_PENDING_NODES_TWO);
  const showThreeMockNodes = useFeatureFlag(FEATURE_FLAG.MOCK_PENDING_NODES_THREE);
  const showManyMockNodes = useFeatureFlag(FEATURE_FLAG.MOCK_PENDING_NODES_MANY);
  const { address, isConnected } = useWallet();

  const { data, isLoading } = useStakingBackendQueryWithParams(
    getPendingNodes,
    { address: address! },
    isConnected
  );

  const node = useMemo(() => {
    if (
      showMockRegistration ||
      showOneMockNode ||
      showTwoMockNodes ||
      showThreeMockNodes ||
      showManyMockNodes
    ) {
      return generatePendingNodes({ userAddress: address!, numberOfNodes: 1 })[0];
    }
    return data?.registrations?.find((node) => node.pubkey_ed25519 === nodeId);
  }, [
    data?.registrations,
    showMockRegistration,
    showOneMockNode,
    showTwoMockNodes,
    showThreeMockNodes,
    showManyMockNodes,
  ]);

  return isLoading ? <Loading /> : node ? <NodeRegistrationForm node={node} /> : notFound();
}

function getStatusFromSubStage(
  subStage: ContractWriteStatus
): VariantProps<typeof statusVariants>['status'] {
  switch (subStage) {
    case 'error':
      return 'red';
    case 'success':
      return 'green';
    case 'pending':
      return 'blue';
    default:
    case 'idle':
      return 'grey';
  }
}

const stageDictionaryMap: Record<REGISTER_STAGE, string> = {
  [REGISTER_STAGE.APPROVE]: 'approve',
  [REGISTER_STAGE.SIMULATE]: 'simulate',
  [REGISTER_STAGE.WRITE]: 'write',
  [REGISTER_STAGE.TRANSACTION]: 'transaction',
  [REGISTER_STAGE.DONE]: 'done',
} as const;

function getDictionaryKeyFromStageAndSubStage<
  Stage extends REGISTER_STAGE,
  SubStage extends ContractWriteStatus,
>({
  currentStage,
  stage,
  subStage,
}: {
  currentStage: REGISTER_STAGE;
  stage: Stage;
  subStage: SubStage;
}) {
  return `${stageDictionaryMap[stage]}.${stage === currentStage ? subStage : stage < currentStage ? 'success' : 'idle'}`;
}

function StageRow({
  currentStage,
  stage,
  subStage,
}: {
  currentStage: REGISTER_STAGE;
  stage: REGISTER_STAGE;
  subStage: ContractWriteStatus;
}) {
  const dictionary = useTranslations('actionModules.register.stage');
  return (
    <span className="inline-flex items-center gap-4 align-middle">
      <StatusIndicator
        className="h-4 w-4"
        status={
          stage === currentStage
            ? getStatusFromSubStage(subStage)
            : stage > currentStage
              ? 'grey'
              : stage < currentStage
                ? 'green'
                : undefined
        }
      />
      <span className="mt-0.5">
        {/** @ts-expect-error - TODO: Properly type this dictionary key construction function */}
        {dictionary(getDictionaryKeyFromStageAndSubStage({ currentStage, stage, subStage }))}
      </span>
    </span>
  );
}

function QueryStatusInformation({
  stage,
  subStage,
}: {
  stage: REGISTER_STAGE;
  subStage: ContractWriteStatus;
}) {
  return (
    <div className="flex w-full flex-col gap-8">
      <StageRow stage={REGISTER_STAGE.APPROVE} currentStage={stage} subStage={subStage} />
      <StageRow stage={REGISTER_STAGE.SIMULATE} currentStage={stage} subStage={subStage} />
      <StageRow stage={REGISTER_STAGE.WRITE} currentStage={stage} subStage={subStage} />
      <StageRow stage={REGISTER_STAGE.TRANSACTION} currentStage={stage} subStage={subStage} />
      <StageRow stage={REGISTER_STAGE.DONE} currentStage={stage} subStage={subStage} />
    </div>
  );
}

function RegisterButton({
  blsPubKey,
  blsSignature,
  nodePubKey,
  userSignature,
  stakeAmount,
  stakeAmountString,
}: {
  blsPubKey: string;
  blsSignature: string;
  nodePubKey: string;
  userSignature: string;
  stakeAmount: bigint;
  stakeAmountString: string;
}) {
  const dictionary = useTranslations('actionModules.register');
  const { registerAndStake, stage, subStage } = useRegisterNode({
    blsPubKey,
    blsSignature,
    nodePubKey,
    userSignature,
  });

  return (
    <>
      <Button
        data-testid={ButtonDataTestId.Register_Submit}
        rounded="lg"
        size="lg"
        onClick={registerAndStake}
      >
        {dictionary('button.submit', { amount: stakeAmountString })}
      </Button>
      {!(stage === REGISTER_STAGE.APPROVE && subStage === 'idle') ? (
        <QueryStatusInformation stage={stage} subStage={subStage} />
      ) : null}
    </>
  );
}

export function NodeRegistrationForm({
  node,
}: {
  node: LoadRegistrationsResponse['registrations'][number];
}) {
  const dictionary = useTranslations('actionModules.register');
  const registerCardDictionary = useTranslations('nodeCard.pending');
  const sessionNodeDictionary = useTranslations('sessionNodes.general');
  const actionModuleSharedDictionary = useTranslations('actionModules.shared');

  const stakeAmount = BigInt(SESSION_NODE.FULL_STAKE_AMOUNT);
  const stakeAmountString = formatBigIntTokenValue(stakeAmount, SENT_DECIMALS);
  const preparationDate = getDateFromUnixTimestampSeconds(node.timestamp);

  return (
    <div className="flex flex-col gap-4">
      <ActionModuleRow
        label={sessionNodeDictionary('publicKeyShort')}
        tooltip={sessionNodeDictionary('publicKeyDescription')}
      >
        <PubKey pubKey={node.pubkey_ed25519} force="collapse" alwaysShowCopyButton />
      </ActionModuleRow>
      <ActionModuleDivider />
      <ActionModuleRow
        label={registerCardDictionary('type')}
        tooltip={registerCardDictionary('typeDescription')}
      >
        {registerCardDictionary(node.type === 'solo' ? 'solo' : 'multi')}
      </ActionModuleRow>
      <ActionModuleDivider />
      <ActionModuleRow
        label={dictionary('preparedAtTimestamp')}
        tooltip={dictionary('preparedAtTimestampDescription')}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer">
              {formatLocalizedRelativeTimeToNowClient(preparationDate, { addSuffix: true })}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {formatDate(preparationDate, {
              dateStyle: 'full',
              timeStyle: 'full',
            })}
          </TooltipContent>
        </Tooltip>
      </ActionModuleRow>
      <ActionModuleDivider />
      {node.type === 'solo' ? (
        <ActionModuleRow
          label={actionModuleSharedDictionary('stakeAmount')}
          tooltip={actionModuleSharedDictionary('stakeAmountDescription')}
        >
          {stakeAmountString} {SENT_SYMBOL}
        </ActionModuleRow>
      ) : null}
      <ActionModuleDivider />
      <RegisterButton
        nodePubKey={node.pubkey_ed25519}
        blsPubKey={node.pubkey_bls}
        blsSignature={node.sig_bls}
        userSignature={node.sig_ed25519}
        stakeAmount={stakeAmount}
        stakeAmountString={stakeAmountString}
      />
    </div>
  );
}

export function NodeRegistrationFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <ActionModuleRowSkeleton />
      <ActionModuleDivider />
      <ActionModuleRowSkeleton />
      <ActionModuleDivider />
      <ActionModuleRowSkeleton />
      <ActionModuleDivider />
      <ActionModuleRowSkeleton />
      <ActionModuleDivider />
      <ButtonSkeleton rounded="lg" size="lg" />
    </div>
  );
}
