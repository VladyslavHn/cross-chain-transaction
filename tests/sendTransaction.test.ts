import { sendSwapAndBridgeTransaction } from "../scripts/sendTransaction";
import { ethers } from "ethers";

jest.mock("ethers", () => {
  const actual = jest.requireActual("ethers");
  return {
    ...actual,
    Contract: jest.fn().mockImplementation(() => ({
      swapTokens: jest.fn().mockResolvedValue({ hash: "0x123", wait: jest.fn().mockResolvedValue({ status: 1 }) }),
      bridgeTokens: jest.fn().mockResolvedValue({ hash: "0x456" }),
    })),
  };
});

describe("sendSwapAndBridgeTransaction", () => {
  it("should send swap and bridge transaction successfully", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    await sendSwapAndBridgeTransaction();

    expect(consoleLogSpy).toHaveBeenCalledWith("Swap Transaction sent with hash: 0x123");
    expect(consoleLogSpy).toHaveBeenCalledWith("Bridge Transaction sent with hash: 0x456");
  });
});
