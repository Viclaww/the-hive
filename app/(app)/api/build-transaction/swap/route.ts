import { NextRequest, NextResponse } from "next/server";

import { getTokenDataByAddress, JUP_API } from "@/lib/solana";
import { Connection, PublicKey, VersionedTransaction } from "@solana/web3.js";

export const POST = async (req: NextRequest) => {
    const { outputMint, inputMint, inputAmount, slippageBps, userPublicKey } = await req.json();

    const outputMintPk = new PublicKey(outputMint);
    const inputMintPk = inputMint ? new PublicKey(inputMint) : new PublicKey("So11111111111111111111111111111111111111112");
        
    const inputMintDecimals = await getTokenDataByAddress(inputMintPk.toString());
    if (!inputMintDecimals) throw new Error("Input mint not found");

    const quoteResponse = await (
        await fetch(
            `${JUP_API}/quote?` +
            `inputMint=${inputMintPk.toString()}` +
            `&outputMint=${outputMintPk.toString()}` +
            `&amount=${inputAmount * (10 ** inputMintDecimals.decimals)}` +
            `&slippageBps=${slippageBps}` +
            `&onlyDirectRoutes=true` +
            `&maxAccounts=20`,
        )
    ).json();
    
    // Get serialized transaction
    const { swapTransaction } = await (
        await fetch(`${JUP_API}/swap`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quoteResponse,
                userPublicKey,
                wrapAndUnwrapSol: true,
                dynamicComputeUnitLimit: true,
                prioritizationFeeLamports: 100000,
            }),
        })
    ).json();

    // Simulate transaction before returning
    const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
    const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
    const simulation = await connection.simulateTransaction(transaction, {
        replaceRecentBlockhash: true,
        commitment: "processed",
    });

    if (simulation.value.err) {
        console.log(simulation);
        throw new Error(`Transaction simulation failed: ${simulation.value.err}`);
    }

    return NextResponse.json({
        swapTransaction,
        outAmount: quoteResponse.outAmount,
    });
}