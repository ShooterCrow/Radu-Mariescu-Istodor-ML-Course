draw = {}

draw.path = (ctx,path,color="blue") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(...path[0])
    path.forEach((p) => {
        ctx.lineTo(...p);
    });
    ctx.lineJoin = "round"
    ctx.stroke();
}

draw.paths = (ctx,paths,color="blue") => {
    paths.forEach((path) => {
        draw.path(ctx, path, color);
    })
}