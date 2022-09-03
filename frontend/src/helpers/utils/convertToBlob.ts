const convertToBlob = async (file: File) => {
    const encoded = (await readFile(file)) as any;

    const binary = atob(encoded.split(',')[1]);

    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    const blobData = new Blob([new Uint8Array(array)], { type: file.type });

    function readFile(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            reader.onload = (e: any) => {
                resolve(e.target.result);
            };
        });
    }

    return blobData;
};

export default convertToBlob;
