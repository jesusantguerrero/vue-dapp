/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
import * as dotenv from "dotenv";
import path = require("path");
import fs = require("fs");
import Moralis from "../_shared/moralis";
import { useSecureString } from "../_shared/useSecureString";

dotenv.config();
const { getEnv } = useSecureString(process.env);
const basePath = getEnv("NFT_ART_PATH");
const imagesDir = `${basePath}/images`;

// read json data
const rawData = fs.readFileSync(`${basePath}/json/_metadata.json`);
const data = JSON.parse(rawData.toString());

const uploadMetadata = async () => {
  for (const edition of data) {
    const image = fs.readFileSync(
      path.resolve(imagesDir, `${edition.edition}.png`),
      { encoding: "base64" }
    );

    const file = new Moralis.File(edition.edition, { base64: image });
    const theFile = await file.saveIPFS();
    console.log(edition.edition, "saved");

    const metadata = new Moralis.Object("Metadata");
    metadata.set("edition", edition.edition);
    metadata.set("image", theFile);
    await metadata.save();
  }
};

uploadMetadata();
