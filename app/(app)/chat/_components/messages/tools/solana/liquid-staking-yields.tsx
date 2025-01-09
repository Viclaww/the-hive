import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { LiquidStakingYieldsResultBodyType, LiquidStakingYieldsResultType } from '@/ai';

interface Props {
    tool: ToolInvocation
}

const LiquidStakingYieldsTool: React.FC<Props> = ({ tool }) => {

    return (
        <ToolCard 
            tool={tool}
            icon="Beef"
            agentName="Staking Agent"
            loadingText={`Getting Best Liquid Staking Yields...`}   
            resultHeading={() => `Fetched Best Liquid Staking Yields`}
            resultBody={(result: LiquidStakingYieldsResultType) => result.body 
                ? <LiquidStakingYields body={result.body} /> 
                :  "No staking yields found"}
        />
    )
}

const LiquidStakingYields: React.FC<{ body: LiquidStakingYieldsResultBodyType }> = ({ body }) => {

    return (
        <div className="flex flex-col gap-2">
            {
                body.map((item) => (
                    <div 
                        key={item.name}
                        className="flex flex-row gap-2 items-center"
                    >
                        <img 
                            src={item.tokenData.logoURI} 
                            alt={item.name} 
                            className="w-6 h-6 rounded-full" 
                        />
                        <div className="flex flex-col">
                            <p className="text-sm font-bold">{item.name} ({item.tokenData.symbol})</p>
                            <p>{item.yield.toFixed(2)}%</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default LiquidStakingYieldsTool;
