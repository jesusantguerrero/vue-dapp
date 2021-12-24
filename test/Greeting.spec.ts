/* eslint-disable no-unused-expressions */
/* eslint-disable node/no-missing-import */
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { getContract } from "../utils/getContract";
import hre from "hardhat";
import { networkConfig, getNetworkIdFromName } from "../helper-hardhat-config";
import { ethers } from "ethers";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Tournament unit tests", async () => {
  let greeting: ethers.Contract,
    linkToken: ethers.Contract,
    vrfCoordinator: ethers.Contract;

  beforeEach(async () => {
    await hre.deployments.fixture(["mocks"]);
    const LinkToken = await hre.deployments.get("LinkToken");
    const VRFCoordinatorMock = await hre.deployments.get("VRFCoordinatorMock");
    linkToken = await hre.ethers.getContractAt("LinkToken", LinkToken.address);
    vrfCoordinator = await hre.ethers.getContractAt(
      "VRFCoordinatorMock",
      VRFCoordinatorMock.address
    );

    const networkId = await getNetworkIdFromName("localhost");
    const keyHash = networkConfig[networkId || 1].keyHash || "";
    greeting = await getContract("Greeting", [
      vrfCoordinator.address,
      linkToken.address,
      keyHash,
    ]);
  });

  it("Should say hello", async () => {
    expect(await greeting.greet()).to.be.equal("Hello World!");
  });
  it("Should set a new message", async () => {
    await greeting.setMessage("Hello Ethereum!");
    expect(await greeting.greet()).to.be.equal("Hello Ethereum!");
  });
});
