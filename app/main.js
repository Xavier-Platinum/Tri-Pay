import app from './app.js';
import "@babel/polyfill"
async function main(){
    let PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is responding at ${PORT} on ${app.settings.env}`);
    })
}
main();