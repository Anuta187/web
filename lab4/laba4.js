let svg = d3.select("svg").attr("width", 800).attr("height", 800);

function HeartShape_Draw() {
    let heart = svg
        .append("g")
        .attr("transform", "scale(1, -1) translate(0, -600)")
        .style("stroke", "#ffd80c")
        .style("stroke-width", 2);


    heart
        .append("circle")
        .attr("cx", -10)
        .attr("cy", 10)
        .attr("r", 10)
        .style("fill", "red");
    heart
        .append("circle")
        .attr("cx", 10)
        .attr("cy", 10)
        .attr("r", 10)
        .style("fill", "pink");

    heart
        .append("path")
        .attr("d", "M -10 10 Q 0 -10 10 10 L 0 30 Z")
        .style("fill", "purple");

    heart
        .append("circle")
        .attr("cx", -5)
        .attr("cy", 15)
        .attr("r", 2)
        .style("fill", "orange");
    heart
        .append("circle")
        .attr("cx", 5)
        .attr("cy", 15)
        .attr("r", 2)
        .style("fill", "orange");
    heart
        .append("line")
        .attr("x1", -5)
        .attr("y1", 20)
        .attr("x2", 5)
        .attr("y2", 20)
        .style("stroke", "blue")
        .style("stroke-width", 2);
    heart
        .append("line")
        .attr("x1", -3)
        .attr("y1", 25)
        .attr("x2", 3)
        .attr("y2", 25)
        .style("stroke", "green")
        .style("stroke-width", 2);

    return heart;
}

let Picture_Draw = (dataForm) => {

    clear_ALL();

    let pict = HeartShape_Draw();
    let path = drawCardioidPath(150, 400, 400);

    let speed_animation = dataForm.animation_time.value === "" ? 5000 : parseFloat(dataForm.animation_time.value);
    let degree = dataForm.scale_checkbox.checked ? 0 : 1;

    pict
        .transition().duration(speed_animation)
        .ease(d3.easeLinear)
        .attrTween("transform", translateAlong(path.node(), degree));
};

let clear_ALL = () => {
    svg.selectAll("*").remove();
};

function createCardioidPath(r, cx, cy) {
    let data = [];
    for (let t = 0; t <= 2 * Math.PI; t += 0.01) {
        let x = cx - r * (1 - Math.cos(t)) * Math.cos(t);
        let y = cy + r * (1 - Math.cos(t)) * Math.sin(t);
        data.push({ x: x, y: y });
    }
    return data;
}

let drawCardioidPath = (r, cx, cy) => {
    const dataPoints = createCardioidPath(r, cx, cy);
    const line = d3.line().x((d) => d.x).y((d) => d.y);
    const path = svg.append("path").attr("d", line(dataPoints)).attr("stroke", "black").attr("fill", "none");
    return path;
};

function translateAlong(path, degree) {
    const length = path.getTotalLength();
    return function () {
        return function (t) {
            let { x, y } = path.getPointAtLength((1 - t) * length);
            return `translate(${x},${y}) rotate(${0}) scale(${degree != 1 ? 1 + t : degree})`;
        };
    };
}

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("animation_btn")
        .addEventListener("click", function () {
            Picture_Draw(document.getElementById("setting"));
        });
    document.getElementById("clear_btn").addEventListener("click", function () {
        clear_ALL();
    });
});
