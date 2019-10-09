module.exports = {
  client: {
    name: "bounties-network",
    service: {
      url: "http://localhost:8080/v1/graphql",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfYWRkcmVzcyI6IjB4YmZlY2VjNDdkZDhiZjVmNjI2NGE5ODMwYTlkMjZlZjM4N2MzOGE2NyIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiOCJ9LCJleHAiOjQ3MjQyNjMyMjB9.uKSLyKZu2B2dDx9KehB00cBEaUWcSWFVrzol7-VO6Hk"
      }
    },
    includes: ["./src/**/*.tsx", "./src/**/*.ts"]
  }
};
