console.log(ethers);
async function setuniqueid() {
   const provider = await ethers.BrowserProvider(window.ethereum);
   console.log(provider);
}

setuniqueid();