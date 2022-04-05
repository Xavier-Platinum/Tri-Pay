import app from './app';
import "@babel/polyfill"
async function main(){
    let PORT = process.env.PORT || 4000;
    await app.listen(PORT, () => {
        console.log(`Server is responding at ${PORT} on ${app.settings.env}`);
    })
}
main();