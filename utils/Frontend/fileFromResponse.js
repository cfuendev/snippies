const getFileFromResponse = async (response) => {
    const blob = await response.blob();
    const blobAnchor = document.createElement("a");
    const blobAnchorURL = URL.createObjectURL(blob);
    blobAnchor.href = blobAnchorURL;
    const regexMatch = response
        .headers
        .get("content-disposition")
        .match(/(?<=filename=).+/);
    console.log(regexMatch)
    if (regexMatch[0]) {
        console.log(`file name found: ${regexMatch[0]}`);
        blobAnchor.download = regexMatch[0];
        console.log(`downloading the file temporally located in ${regexMatch[0]}...`);
        blobAnchor.click();
        console.log(`file downloaded. deleting blob url...`);
        URL.revokeObjectURL(blobAnchorURL);
    };
};

export default getFileFromResponse;