export const withInstall = (com: any) => {
  com.install = (app: any) => {
    app.component(com.name, com);
  };
  return com; 
};
