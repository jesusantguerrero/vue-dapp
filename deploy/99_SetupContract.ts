/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-unpublished-import */
import { deployments } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { autoFundCheck, networkConfig } from "../helper-hardhat-config";
import { getContract } from "../utils/getContract";

const SetupContract: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { get } = deployments;
  const chainId = (await hre.getChainId()) || "31337";

  interface IChainLink {
    linkTokenAddress?: string;
    vrfCoordinatorAddress?: string;
  }
  const chainLink: IChainLink = {
    linkTokenAddress: "",
    vrfCoordinatorAddress: "",
  };

  // If we are on a local development network, we need to deploy mocks!

  if (chainId === "1337") {
    const linkToken = await get("LinkToken");
    const vrfCoordinator = await get("VRFCoordinatorMock");
    chainLink.linkTokenAddress = linkToken.address;
    chainLink.vrfCoordinatorAddress = vrfCoordinator.address;
  } else {
    // Otherwise, we can use the real contracts deployed on the mainnet.
    chainLink.linkTokenAddress = networkConfig[chainId].linkToken;
    chainLink.vrfCoordinatorAddress = networkConfig[chainId].vrfCoordinator;
  }

  const keyHash = networkConfig[chainId].keyHash || "";

  const greeting = await getContract("Greeting", [
    chainLink.vrfCoordinatorAddress,
    chainLink.linkTokenAddress,
    keyHash,
  ]);

  if (
    chainLink.linkTokenAddress &&
    (await autoFundCheck(
      greeting.address,
      networkConfig[chainId].name,
      chainLink.linkTokenAddress,
      "Nothing more"
    ))
  ) {
    await hre.run("fund-link", {
      contract: greeting.address,
      linkaddress: chainLink.linkTokenAddress,
    });
  }
};

export default SetupContract;
SetupContract.tags = ["local"];
