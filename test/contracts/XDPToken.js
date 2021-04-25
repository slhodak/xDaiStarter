const XDPToken = artifacts.require("XDPToken");

contract("XDPToken", async accounts => {
  it("should be a token", async () => {
    const instance = await XDPToken.deployed();
    assert(true);
  });
});
