import { NextRequest, NextResponse } from "next/server";

import { JUP_API, getTokenDataByAddress } from "@/lib/solana";

export const POST = async (req: NextRequest) => {
    const { inputAmount, slippageBps, userPublicKey, contractAddress } = await req.json();
        
    const inputMintDecimals = await getTokenDataByAddress("So11111111111111111111111111111111111111112");
    if (!inputMintDecimals) throw new Error("Input mint not found");

    console.log(inputAmount, slippageBps, userPublicKey, contractAddress, inputMintDecimals);

    const quoteResponse = await (
        await fetch(
            `${JUP_API}/quote?` +
            `inputMint=So11111111111111111111111111111111111111112` +
            `&outputMint=${contractAddress}` +
            `&amount=${Math.floor(inputAmount * (10 ** inputMintDecimals.decimals))}` +
            `&slippageBps=${slippageBps}`
        )
    ).json();
    
    // Add error handling for quote
    if (!quoteResponse || quoteResponse.error) {
        console.error("Quote error:", quoteResponse);
        return NextResponse.json({ error: "Failed to get quote" }, { status: 400 });
    }

    // Get serialized transaction
    try {
        const { swapTransaction, simulationError } = await (
            await fetch("https://quote-api.jup.ag/v6/swap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quoteResponse,
                    userPublicKey,
                    wrapAndUnwrapSol: true,
                }),
            })
        ).json();

        console.log(simulationError);

        if (!swapTransaction) {
            return NextResponse.json({ error: "Failed to generate transaction" }, { status: 400 });
        }

        return NextResponse.json({
            swapTransaction,
            outAmount: quoteResponse.outAmount,
        });
    } catch (error) {
        console.error("Swap error:", error);
        return NextResponse.json({ error: "Failed to create swap transaction" }, { status: 500 });
    }
}