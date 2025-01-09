import React from 'react';

import type { UnstakeResultBodyType } from '@/ai';

interface Props {
    unstakeResult: UnstakeResultBodyType;
    amount: number;
}

const UnstakeResult: React.FC<Props> = ({ amount, unstakeResult }) => {

    return (
        <p className="text-xs text-muted-foreground">
            Unstaked {amount} {unstakeResult.symbol}
        </p>
    );
};

export default UnstakeResult; 