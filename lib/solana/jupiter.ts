import {
    QuoteGetRequest,
    QuoteResponse,
    createJupiterApiClient,
} from "@jup-ag/api";

const jupiterQuoteApi = createJupiterApiClient();
  
  export const getQuote = async (inputMint: string, outputMint: string, amount: number) => {
    const params: QuoteGetRequest = {
      inputMint,
      outputMint,
      amount,
      maxAccounts: 20,
      slippageBps: 300,
    };
  
    // get quote
    const quote = await jupiterQuoteApi.quoteGet(params);
  
    if (!quote) {
      throw new Error("unable to quote");
    }
    return quote;
  }
  
export const getSwapObj = async (userPublicKey: string, quoteResponse: QuoteResponse) => {

    console.log(userPublicKey);


    // Get serialized transaction
    const swapObj = await jupiterQuoteApi.swapPost({
        swapRequest: {
            quoteResponse,
            userPublicKey,
            wrapAndUnwrapSol: true,
            // dynamicComputeUnitLimit: true,
            // prioritizationFeeLamports: 'auto',
            // dynamicSlippage: {
            //     maxBps: 300,
            // }
        },
    });
    return swapObj;
}