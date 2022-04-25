#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{DepsMut, Env, MessageInfo, Response};
use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{InstantiateMsg};
use crate::state::{State, STATE};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:clicker";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
  deps: DepsMut,
  _env: Env,
  info: MessageInfo,
  msg: InstantiateMsg,
) -> Result<Response, ContractError> {

  // We're storing stuff in a variable called "state" of type "State"
  let state = State {
    count: msg.count,
    owner: info.sender.clone(),
  };

  // We're setting the contract version using a helper function we imported
  set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
  // We're storing state in a special variable called "STATE"
  STATE.save(deps.storage, &state)?;

  // Sending a response back to the caller
  Ok(Response::new()
    .add_attribute("method", "instantiate")
    .add_attribute("owner", info.sender)
    .add_attribute("count", msg.count.to_string()))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
  match msg {
      QueryMsg::GetCount {} => to_binary(&query_count(deps)?),
  }
}

fn query_count(deps: Deps) -> StdResult<CountResponse> {
  let state = STATE.load(deps.storage)?;
  Ok(CountResponse { count: state.count })
}