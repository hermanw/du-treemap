function parse(output) {
    var result = {};
    var arr = output.split('\n');
    result.root = arr[arr.length-2].split('\t')[1];
    result.diskData = [];
    arr.forEach(line => {
        if (line.length > 0) {
            var ptr = result.diskData;
            t = line.split('\t');
            nodes = t[1].slice(result.root.length+1,t[1].length).split('\/');
            if (nodes[0].length > 0) {
                insertNode(ptr,nodes,0,t[0]);
            } else {
                insertDotNode(ptr,t[0]/2000);
            }
        }
    });
    return result;
}

function insertNode(ptr, nodes, index, value) {
    // find the node
    var node = null;
    for (let i = 0; i < ptr.length; i++) {
        if (ptr[i].name == nodes[index]) {
            node = ptr[i];
            break;
        }
    }
    if (node == null) {
        ptr.push({"value": 0,"name": nodes[index]});
        node = ptr[ptr.length-1];
    }
    // check leaf
    if (index == nodes.length-1) {
        // insert the value, 512 byte blocks to MB
        node.value = value/2000;
        if (node.children != undefined) {
            insertDotNode(node.children,node.value);
        }
    } else {
        if (node.children == undefined) {
            node.children = [];
        }
        insertNode(node.children, nodes, index+1, value);
    }
}

function insertDotNode(children, value) {
    var total = 0;
    children.forEach(c =>{
        total += c.value;
    });
    children.push({"value": value - total,"name": "."});
}