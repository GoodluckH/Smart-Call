import React from "react";
import { Box } from "@chakra-ui/react";
import GetterFunctions from "./GetterFunctions";
import NormalFunctions from "./NormalFunctions";

/// Get all functions from a parsed ABI
function ContractFunctions({ ABI, contractAddress }) {
  if (Object.keys(ABI).length === 0) return;
  var parsed = JSON.parse(ABI);

  var functions = parsed.filter((item) => item.type === "function");
  var getterFunctions = functions.filter(
    (item) => item.stateMutability === "view" || item.stateMutability === "pure"
  );
  var normalFunctions = functions.filter(
    (item) =>
      (item.inputs.length !== 0 && !getterFunctions.includes(item)) ||
      !getterFunctions.includes(item)
  );

  return (
    <>
      <GetterFunctions
        functions={getterFunctions}
        ABI={ABI}
        contractAddress={contractAddress}
      />
      <Box h={12}></Box>
      <NormalFunctions
        functions={normalFunctions}
        ABI={ABI}
        contractAddress={contractAddress}
      />
    </>
  );
}

export default ContractFunctions;
