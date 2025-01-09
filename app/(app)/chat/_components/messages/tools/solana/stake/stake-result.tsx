import React from 'react';
    
import type { StakeResultBodyType } from '@/ai';

interface Props {
    stakeResult: StakeResultBodyType;
    amount: number;
}

const StakeResult: React.FC<Props> = ({ stakeResult, amount }) => {

    return (
        <p className="text-xs text-muted-foreground">
            Staked {amount} SOL for {stakeResult.symbol}
        </p>
    );
};

export default StakeResult; 