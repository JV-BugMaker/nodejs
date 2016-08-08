function start()
{
    console.log("request start handle there");
    return "Hello Start";
}

function upload()
{
    console.log("request upload handle there");
    return "Hello Upload";
}
function favicon()
{
    return;
}
exports.start = start;
exports.upload = upload;
