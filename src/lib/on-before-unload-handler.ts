const onBeforeUnloadHandler = (e) => {
  const msg = "Changes you made may not be saved.";
  e.returnValue = msg;
  return msg
}

export default onBeforeUnloadHandler