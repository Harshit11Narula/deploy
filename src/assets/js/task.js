
var jsmediatags = require("jsmediatags");

function task1(file) {
    return new Promise((resolve, reject) => {
        new jsmediatags.Reader(file)
            .read({
                onSuccess: (tag) => {
                    console.log('Success!');
                    resolve(tag);
                },
                onError: (error) => {
                    console.log('Error');
                    reject(error);
                }
            });
    })
}
export { task1 };


