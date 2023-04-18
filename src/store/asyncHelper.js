/**
 * Generates keys that will be assigned to state & used as mutation names
 * @param stateKey
 * @param mutationKey
 * @returns {{[p: string]: string}}
 */
const keyGenerator = (stateKey, mutationKey) => {
  return {
    [`${stateKey}Success`]: `SET_${mutationKey}_SUCCESS`,
    [`${stateKey}Loading`]: `SET_${mutationKey}_LOADING`,
    [`${stateKey}Error`]: `SET_${mutationKey}_ERROR`,
  }
}

/**
 * Wraps a network call (callback param) with proper mutation calls to track
 * loading, success & error state for it.
 * @param commit Reference to the commit method passed from the namespaced module
 * @param mutationKey Name of the mutation key to automatically call proper state mutation
 * @param callback The async call this function wraps around
 * @param errorText Optional error message displayed in case of failure
 * @param onSuccess Optional function executed after the success commit
 * @param onError Optional function to execute on errors
 * @param beforeExit Optional function to execute in finally block
 * @returns {Promise<void>}
 */
export async function performNetworkCall (commit, mutationKey, callback, errorText, onSuccess, onError, beforeExit) {
  // clear errors
  commit(`SET_${mutationKey}_ERROR`, false);
  // enable loading state
  commit(`SET_${mutationKey}_LOADING`, true);

  try{
    if(callback) {
      await callback();
    }
    commit(`SET_${mutationKey}_SUCCESS`, true);
    if(onSuccess) onSuccess();
  } catch (e) {
    commit(`SET_${mutationKey}_ERROR`, true);
    if(errorText) {
      this._vm.$notifyError('Oops', errorText);
    }
    if(onError) onError();
  }finally {
    commit(`SET_${mutationKey}_LOADING`, false);

    setTimeout(() => {
        commit(`SET_${mutationKey}_SUCCESS`, false);
        commit(`SET_${mutationKey}_ERROR`, false);
    }, 500);

    if(beforeExit) beforeExit();
  }
}

/**
 * Generates state and mutation form a key list.
 * Key list format: { 'stateKey', 'mutationKey'}
 * stateKey will add 'stateKeyLoading', 'stateKeyError', 'stateKeySuccess' properties to state.
 * mutationKey will add 'SET_mutationKey_SUCCESS, 'SET_mutationKey_ERROR' & 'SET_mutationKey_SUCCESS'
 * properties to mutation
 * @param stateReference
 * @param mutationReference
 * @param keyList
 * @param defaultValue default value for state properties. Defaults to fault
 */
export function populateStore (stateReference, mutationReference, keyList, defaultValue) {
  if(defaultValue === undefined) defaultValue = false;
  Object.entries(keyList).forEach(([stateKey, mutationKey]) => {
    let keys = keyGenerator(stateKey, mutationKey);
    Object.keys(keys).forEach(key => {
      stateReference[`${key}`] = defaultValue;
      mutationReference[`${keys[key]}`] = (state, payload) => {
        state[key] = payload;
      }
    })
  });
}

export function buildFormData(formDataReference, payloadReference) {
    Object.keys(payloadReference).forEach(payloadEntry => {
        if (payloadReference[payloadEntry]) {
            formDataReference.append(payloadEntry, payloadReference[payloadEntry])
        }
    })

    return formDataReference;
}


