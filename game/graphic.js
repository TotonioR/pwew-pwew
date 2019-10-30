function init(life)
{
    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);
    
    player1 = new Player("player1", 0xffff00, new THREE.Vector2(240, 0), 0, life);
    player2 = new Player("player2", 0xfc0303, new THREE.Vector2(-240, 0), 0, 1);
    scene.add(player1.graphic);
    scene.add(player2.graphic);
    noGround = [];
    ground = new Ground(0xffffff, WIDTH, HEIGHT, 10);
    light1 = new Light("sun", 0xffffff);
    scene.add(light1);
}

function Ground(color, size_x, size_y, nb_tile)
{
    colors = Array(0xff0000, 0x00ff00, 0x0000ff, 0x000000);
    colorsadd = Array(0xff0000, 0x00ff00, 0x0000ff)
    sizeOfTileX = size_x / nb_tile;
    minX = -(size_x/2);
    maxX = (size_x/2);
    
    sizeOfTileY = size_y / nb_tile;
    minY = -(size_y/2);
    maxY = (size_y/2);
    p1x = Math.round(player1.graphic.position.x)
    p1y = Math.round(player1.graphic.position.y)
    p2x = Math.round(player2.graphic.position.x)
    p2y = Math.round(player2.graphic.position.y)
    for (x = minX; x <= maxX; x = x+sizeOfTileX){
        for (y = minY; y <= maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];
            if (0x000000 != color ||
                 (x <= p1x && x + sizeOfTileX > p1x && y <= p1y && y + sizeOfTileY > p1y)||
                 (x <= p2x && x + sizeOfTileX > p2x && y <= p2y && y + sizeOfTileY > p2y))
            {
                if (0x000000 == color)
                {
                    color = 0xff0110
                }
                tmpGround = new THREE.Mesh(
                new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                tmpGround.position.x = x;
                tmpGround.position.y = y;
                scene.add(tmpGround);
            }
            else
                noGround.push([x, y]);
        }
    }
}

function Light(name, color)
{
    pointLight = new THREE.DirectionalLight(color, 30);
    return pointLight;
}
