//=========variables=======================
var cam_z       = 6, cam_y = 0;
var tx          = 4, ty = 8, tz = 0;
var px          = 0, py = -1.6, pz = 0;
var ly          = py-1.8,  hdy = py+1.6, hy = py+0.3;
var num_objs    = 200;
var Score       = 0, Health = 6;
var speedy      = 0.6;
var speedyss    = 0.8;
var speedfall   = 0;
var g           = 0.04
var multiplier  = 1;
var powerup_dur = 10;
var dir         = 1;
var x           = 0;
var rot         = 45;
var pl_speed    = 0.4;
var pol_speed   = pl_speed/1.1;
var light       = 1.0;
//=========objects==========================
var tracks1     = [], tracks2 = [], tracks3 = [];
var wall1       = [], wall2 = [];
var enemies1    = [], ceils = [], pillars = [];
var coins       = [];
var player      = [];
var dog         = [];
//=========flags============================
var flag_ss     = 0;   
var fl_kill     = 0, flag_j = false, flag_topple = false;
var flag_lr     = 0;
var grey_flag   = false;
var jet_on      = false;
var jet_off     = -100;
var on_train = false, off_train = false;
var fl_stumble = 0;
// calling the main gamne function
main();

function main() 
{
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) 
    {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }
    // ========== loading the textures =====================
    texture      = loadTexture(gl, './assets/tex_rail.jpg');
    texture2     = loadTexture(gl, './assets/tex_pla.jpg');
    texture3     = loadTexture(gl, './assets/tex_wall4.jpg');
    texture4     = loadTexture(gl, './assets/tex_bar.jpeg');
    texture5     = loadTexture(gl, './assets/tex_coinsex.jpg');
    texture6     = loadTexture(gl, './assets/tex_ceil5.jpg');
    texture7     = loadTexture(gl, './assets/tex_wall.jpeg'); 
    texture9     = loadTexture(gl, './assets/tex_train.jpg');
    texture_tf   = loadTexture(gl, './assets/train_fr.png');
    texture_red  = loadTexture(gl, './assets/tex_red.jpg');
    texture_head = loadTexture(gl, './assets/tex_hair.png');
    texture_hand = loadTexture(gl, './assets/tex_skin.jpg');
    texture_ss   = loadTexture(gl, './assets/tex_supersneakers.jpg');
    texture_2x   = loadTexture(gl, './assets/tex_2x.png');
    texture_jet  = loadTexture(gl, './assets/jet.png');
    texture_dog  = loadTexture(gl, './assets/tex_dog.jpg');
    texture_pol  = loadTexture(gl, './assets/police.png');
    texture_poluni  = loadTexture(gl, './assets/uniform.png');
    texture_won  = loadTexture(gl, './assets/win.png')
    // =====================================================

    shade1 = new shader1(gl, grey_flag); 
    shade2 = new shader2(gl, grey_flag); 

    var i;
    
    for(i = 0; i < num_objs ; i++) {
        tracks1.push(new Track(gl, [-tx , -ty, tz - 20*i], texture,10,4,2));
        tracks2.push(new Track(gl, [0, -ty, tz - 20*i], texture,10,4,2));
        tracks3.push(new Track(gl, [tx, -ty, tz - 20*i], texture,10,4,2));
        wall1.push(new Wall(gl, [5*tx, -1, tz - 24*i], texture3,12,12,12));
        wall2.push(new Wall(gl, [-5*tx, -1, tz - 24*i], texture3,12,12,12));
        enemies1.push(new Enemy1(gl, [(i%2?1:-1)*tx, -3.5, -10 - 80*i], texture4));
        ceils.push(new Cube(gl, [0, ty+3, tz - 24*i], texture6,12,10,1));
        pillars.push(new Cube(gl, [0,0,-70 - 140*i], texture7,1,0.8,8));
        coins.push(new Coin(gl, [(getRandomInt(-1,2))*4,-3,-17*i-17], texture5,1,0.1));
    }
    pl     = new Cube(gl, [px, py, pz], texture2, 0.4, 1.3, 1.2);
    leg1   = new Cube(gl, [px-0.8, ly, pz], texture_red, 0.4, 0.5, 0.6);
    leg2   = new Cube(gl, [px+0.8, ly, pz], texture_red, 0.4, 0.5, 0.6);
    head   = new Cube(gl, [px, hdy, pz], texture_head, 0.4, 0.5, 0.4);    
    hand1  = new Cube(gl, [px-1.6, hy, pz], texture_hand, 0.4, 0.3, 0.4);    
    hand2  = new Cube(gl, [px+1.6, hy, pz], texture_hand, 0.4, 0.3, 0.4); 
    train1 = new Cube(gl, [tx, -2, -50], texture9, 5, 1.8, 4);
    train2 = new Cube(gl, [-tx, -2, -300], texture9, 5, 1.8, 4);
    tf1    = new Cube(gl, [tx, -2, train1.pos[2]+5], texture_tf, 0.1, 1.8, 4);
    tf2    = new Cube(gl, [-tx, -2, train2.pos[2]+5], texture_tf, 0.1, 1.8, 4);
    ss1    = new Coin(gl, [(getRandomInt(-1, 2))*4, -2, -100], texture_ss, 2, 0.2);
    ss2    = new Coin(gl, [(getRandomInt(-1, 2))*4, -2, -800], texture_ss, 2, 0.2);
    mult2x = new Coin(gl, [(getRandomInt(-1, 2))*4, -2, -300], texture_2x, 2, 0.2);
    jet1   = new Cube(gl, [(getRandomInt(-1, 2))*4, -1.5, -400], texture_jet, 0.1, 1, 1);

    dog_b = new Cube(gl, [px, py-1.6, pz+3], texture_dog, 1, 0.4, 0.4);
    dog_h = new Cube(gl, [px, py-1, pz+2.4], texture_head, 0.2, 0.4, 0.2);
    dog_l1 = new Cube(gl, [px+0.3, py-1.9, pz+3.6], texture_head, 0.1, 0.1, 0.5);
    dog_l2 = new Cube(gl, [px-0.3, py-1.9, pz+3.6], texture_head, 0.1, 0.1, 0.5);
    dog_l3 = new Cube(gl, [px+0.3, py-1.9, pz+2.4], texture_head, 0.1, 0.1, 0.5);
    dog_l4 = new Cube(gl, [px-0.3, py-1.9, pz+2.4], texture_head, 0.1, 0.1, 0.5);
    dog_t = new Cube(gl, [px, py-1.6, pz+4.6], texture_head, 0.3, 0.1, 0.1);

    pol     = new Cube(gl, [px-0.4, py, pz+3.2], texture_poluni, 0.4, 1.3, 1.4);
    pol_back   = new Cube(gl, [px-0.4, py, pz+3.6], texture_pol, 0.01, 1.3, 1.4);
    pol_leg1   = new Cube(gl, [px-0.8-0.4, ly, pz+3.2], texture_poluni, 0.4, 0.5, 0.6);
    pol_leg2   = new Cube(gl, [px+0.8-0.4, ly, pz+3.2], texture_poluni, 0.4, 0.5, 0.6);
    pol_head   = new Cube(gl, [px-0.4, hdy+0.4, pz+3.2], texture_head, 0.4, 0.5, 0.5);    
    pol_hand1  = new Cube(gl, [px-1.6-0.4, hy, pz+3.2], texture_poluni, 0.4, 0.3, 0.4);    
    pol_hand2  = new Cube(gl, [px+1.6-0.4, hy, pz+3.2], texture_poluni, 0.4, 0.3, 0.4); 

    won        = new Cube(gl, [0, 2, -1200], texture_won, 1, 6, 9); 

    player.push(pl, leg1, leg2, head, hand1, hand2);   
    const shaderProgram1 = shade1.initShaderProgram(gl);
    const shaderProgram2 = shade2.initShaderProgram(gl);
    const programInfo1 = {
        program: shaderProgram1,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram1, 'aVertexPosition'),
          vertexNormal: gl.getAttribLocation(shaderProgram1, 'aVertexNormal'),
          textureCoord: gl.getAttribLocation(shaderProgram1, 'aTextureCoord'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram1, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram1, 'uModelViewMatrix'),
          normalMatrix: gl.getUniformLocation(shaderProgram1, 'uNormalMatrix'),
          uSampler: gl.getUniformLocation(shaderProgram1, 'uSampler'),
          ambientStrength: gl.getUniformLocation(shaderProgram1, 'uAmbientStrength')
        },
    };
    const programInfo2 = {
        program: shaderProgram2,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
          vertexNormal: gl.getAttribLocation(shaderProgram2, 'aVertexNormal'),
          textureCoord: gl.getAttribLocation(shaderProgram2, 'aTextureCoord'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
          normalMatrix: gl.getUniformLocation(shaderProgram2, 'uNormalMatrix'),
          uSampler: gl.getUniformLocation(shaderProgram2, 'uSampler'),
          ambientStrength: gl.getUniformLocation(shaderProgram2, 'uAmbientStrength')
        },
    };

    var then = 0;
    function render(now) {
        now *= 0.001;    // convert to seconds
        const deltaTime = now - then;
        then = now;
        input();
        // jump
        if(flag_j) {
            pl.pos[1] += speedy;
            speedy -= g;
            if(pl.pos[1] <= py)
            {
                pl.pos[1] = py;
                
                flag_j = false;
            }
        }
        else 
        {
            speedy = (flag_ss) ? speedyss : 0.6;
            if(!jet_on && !jet_off)pl.pos[1] = py;
        }
        //jetpack
        if(jet_on) {
            if(pl.pos[1] < 5) {
                pl.pos[1] += 0.1;
                // console.log(pl.pos[1]);
            }
            else {
                // console.log("else mein")
                pl.pos[1] = 5;
            }
        }
        // console.log(pl.pos[1])

        if(jet_off > 0 && !on_train)
        {
            // console.log("off")
            if(pl.pos[1] > py)
            {
                // console.log(pl.pos[1])
                pl.pos[1] -= speedfall;
                speedfall += g;
            }
            else{
                pl.pos[1] = py;
                jet_off = 0;
                speedfall = 0;
            }
        }
        head.pos[1] = pl.pos[1]+1.6;
        leg1.pos[1] = pl.pos[1]-1.8;
        leg2.pos[1] = pl.pos[1]-1.8;
        hand1.pos[1] = pl.pos[1]+0.3;
        hand2.pos[1] = pl.pos[1]+0.3;

        if(!grey_flag)drawScene(gl, programInfo1, deltaTime, now);
        else drawScene(gl, programInfo2, deltaTime, now);
        requestAnimationFrame(render);
    } 
    requestAnimationFrame(render);
}

function resize(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
    // Check if the canvas is not the same size.
    if (canvas.width != displayWidth ||
        canvas.height != displayHeight) {

        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}

function drawScene(gl, programInfo,deltaTime, now) 
{
    // console.log(pol.pos[2]-pl.pos[2])
    resize(gl.canvas);
    gl.clearColor(0, 255, 255, 1.0);    // Clear to black, fully opaque
    gl.clearDepth(1.0);                                 // Clear everything
    gl.enable(gl.DEPTH_TEST);                     // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                        // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const fieldOfView = 85 * Math.PI / 180;     // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 1000.0;
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix,fieldOfView,aspect,zNear,zFar);
    var camMat = mat4.create();
    mat4.translate(camMat, camMat, [pl.pos[0]*0.5, pl.pos[1]*0.4+4, pl.pos[2]+13]);
    var camPos = [camMat[12], camMat[13], camMat[14]];
    var up = [0, 1, 0];
    mat4.lookAt(camMat, camPos, [camPos[0], camPos[1], camPos[2]-5], up);
    var viewMatrix = camMat;//mat4.create();
    var viewProjectionMatrix = mat4.create();
    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
    var i;

    if(x != rot)  x += (rot > 0 ? 1 : -1)*5
    else  rot *= -1
    if(!jet_on){
        hand1.rotation = x * Math.PI/180;
        hand2.rotation = -x * Math.PI/180;
        leg1.rotation = -x * Math.PI/180;
        leg2.rotation = x * Math.PI/180;

        pol_hand1.rotation = x * Math.PI/180;
        pol_hand2.rotation = -x * Math.PI/180;
        pol_leg1.rotation = -x * Math.PI/180;
        pol_leg2.rotation = x * Math.PI/180;

        dog_h.rotation = x/2 * Math.PI/180;
        dog_l1.rotation = x * Math.PI/180;
        dog_l2.rotation = x * Math.PI/180;
        dog_l3.rotation = -x * Math.PI/180;
        dog_l4.rotation = -x * Math.PI/180;
        dog_t.rotation = (x+45) * Math.PI/180;

    }
    dog_b.pos[0] = pl.pos[0] + 1.5;
    dog_b.pos[2] = pl.pos[2] + 3
    dog_h.pos[0] = dog_b.pos[0];
    dog_l1.pos[0] = dog_b.pos[0] + 0.3;
    dog_l2.pos[0] = dog_b.pos[0] - 0.3;
    dog_l3.pos[0] = dog_b.pos[0] + 0.3;
    dog_l4.pos[0] = dog_b.pos[0] - 0.3;
    dog_t.pos[0] = dog_b.pos[0];
    dog_h.pos[2] = dog_b.pos[2] - 0.6; 
    dog_l1.pos[2] = dog_b.pos[2] + 0.6;
    dog_l2.pos[2] = dog_b.pos[2] + 0.6;
    dog_l3.pos[2] = dog_b.pos[2] - 0.6;
    dog_l4.pos[2] = dog_b.pos[2] - 0.6;
    dog_t.pos[2] = dog_b.pos[2] + 1.6;

    pol.pos[0] = pl.pos[0] - 0.4;
    pol_back.pos[0] = pol.pos[0];
    pol_leg1.pos[0] = pol.pos[0]-0.8;
    pol_leg2.pos[0] = pol.pos[0]+0.8;
    pol_head.pos[0] = pol.pos[0];
    pol_hand1.pos[0] = pol.pos[0]-1.6;
    pol_hand2.pos[0] = pol.pos[0]+1.6;
    // pol.pos[2] = pl.pos[2]+3.2;
    pol_head.pos[2] = pol.pos[2];
    pol_hand1.pos[2] = pol.pos[2];
    pol_hand2.pos[2] = pol.pos[2];
    pol_leg1.pos[2] = pol.pos[2];
    pol_leg2.pos[2] = pol.pos[2];
    pol_back.pos[2] = pol.pos[2]-0.4;
    // ##################################################################
    // ################COLLISION DETECTION PART##########################
    // ################################################################## 

    //pillar
    for(i=0;i<num_objs;i++)
    {
        if(Math.abs(pl.pos[2]-(pillars[i].pos[2])) <= 3  && Math.abs(pillars[i].pos[0]-pl.pos[0])<1 && !fl_kill)
        {
            Health--;
            fl_kill = i+1;
        }
    }
    if(fl_kill && Math.abs(pl.pos[0]) > 2) fl_kill = 0;
    
    //enemy1
    for(i=0;i<num_objs;i++)
    {
        if(Math.abs(pl.pos[2]-(enemies1[i].pos[2])) <= 0.5  && Math.abs(enemies1[i].pos[0]-pl.pos[0])<1 && !fl_stumble)
        {
            if(Math.abs(pl.pos[1]-enemies1[i].pos[1])<3)
            {
                Health--;
                fl_stumble = (pol.pos[2]-pl.pos[2]);
                enemies1[i].rotation = -90 * Math.PI/180;
                // flag_j = false;
                // console.log("takkar")
            }
        }
    }
    if(fl_stumble) pl_speed = 0.2;
    if(fl_stumble > 10 && (pol.pos[2] - pl.pos[2]) < 3)
    {
        pl_speed = 0.4;
        fl_stumble = false;
    }
    if(pol.pos[2]-pl.pos[2] <= 1) Health = 0;
    // super-sneakers
    if(Math.abs(pl.pos[0]-ss1.pos[0]<1) && Math.abs(pl.pos[2]-ss1.pos[2])<1) {
        flag_ss = now+powerup_dur;
        speedy = speedyss;
        ss1.scored = true; 
    }
    if(Math.abs(pl.pos[0]-ss1.pos[0]<1) && Math.abs(pl.pos[2]-ss2.pos[2])<1) {
        flag_ss = now+powerup_dur;
        speedy = speedyss;
        ss2.scored = true; 
    }
    if(Math.abs(pl.pos[0]-jet1.pos[0]<1) && Math.abs(pl.pos[2]-jet1.pos[2])<1) {
        jet_on = now+powerup_dur;
        // speedy = speedyss;
        jet1.scored = true; 
    }
    var val = document.getElementById("myRange");
    if(flag_ss>0) val.value = (flag_ss-now)*100/powerup_dur;
    if(jet_on>0) val.value = (jet_on-now)*100/powerup_dur;

    if(flag_ss>0) 
    {
        document.getElementById("powerup").innerHTML = 'Powerup: SUPER SNEAKERS!!';
    }
    else if(jet_on>0) 
    {
        document.getElementById("powerup").innerHTML = 'Powerup: JETPACK!!';
    }
    else document.getElementById("powerup").innerHTML = 'Powerup:';
    // val.innerHTML = 'Powerup: SuperSneakers!!'
    if(now > flag_ss && flag_ss) flag_ss = 0;
    if(now > jet_on && jet_on)
    {
        jet_on = 0;
        jet_off = 1;
    }
    // 2x multiplier
    if(Math.abs(pl.pos[0]-mult2x.pos[0])<1 && Math.abs(pl.pos[2]-mult2x.pos[2])<2) {
        multiplier = 2;
        mult2x.scored = true;
        console.log("2x");
    } 

    // coins
    for(i=0;i<num_objs;i++)
    {
        if(Math.abs(pl.pos[2]-(coins[i].pos[2])) <= 1  && Math.abs(coins[i].pos[0]-pl.pos[0])<1 && !coins[i].scored)
        {
            if(pl.pos[1] == py){
                Score += 50;
                coins[i].scored = true;
            }
        }
    }

    // trains
    if(Math.abs(pl.pos[0]-train1.pos[0])<1 && Math.abs(pl.pos[2] - train1.pos[2]) < 5 && pl.pos[1] < 1) Health = 0;
    if(Math.abs(pl.pos[0]-train2.pos[0])<1 && Math.abs(pl.pos[2] - train2.pos[2]) < 5 && pl.pos[1] < 1) Health = 0;
    
    if(Math.abs(pl.pos[0]-train1.pos[0])<1 && Math.abs(pl.pos[2]-train1.pos[2])<5 && leg1.pos[1]>0.6 && jet_off)
    {
        if(leg1.pos[1]<=0.6)
        {
            pl.pos[1] = 2.4;
            on_train = true;
        }
    }
    if(pl.pos[1]>2.3 && on_train && !jet_on && !flag_ss)
    {
        if(Math.abs(pl.pos[0]-train1.pos[0])>1 || Math.abs(pl.pos[2]-train1.pos[2])>5)
        {
            off_train = true;
        }
    } 

    if(off_train)
    {
        if(pl.pos[1]>py)
        {
            pl.pos[1] -= speedfall;
            speedfall += g;
        }
        else{
            pl.pos[1] = py; 
            speedfall = 0;
        }
    }
    
    //winning
    if(pl.pos[2] - won.pos[2] <= 2)
    {
        alert('Congrats! You won the game. Your score: ' + Score * multiplier);
    }

    // ################ END OF COLLISON DETECTION ######################
    if(!fl_kill){
        player.forEach(function(v) {
            v.pos[2] -= pl_speed;
        })
    }
    pol.pos[2] -= pol_speed;
    if(pl.pos[0] != flag_lr)
    {
        pl.pos[0] += (flag_lr-pl.pos[0])/3;        
    }
    head.pos[0] = pl.pos[0];
    hand1.pos[0] = pl.pos[0]-1.6;
    hand2.pos[0] = pl.pos[0]+1.6;
    leg1.pos[0] = pl.pos[0]-0.8;
    leg2.pos[0] = pl.pos[0]+0.8;


    train1.pos[2] += 0.4;
    train2.pos[2] += 0.4;
    tf1.pos[2] = train1.pos[2]+5;
    tf2.pos[2] = train2.pos[2]+5;
    if(train1.pos[2] - pl.pos[2] > 15) train1.pos[2] = pl.pos[2] - 600;
    if(train2.pos[2] - pl.pos[2] > 15) train2.pos[2] = pl.pos[2] - 600;
    // police.pos[2] -= 0.39;
    // police.pos[0] = pl.pos[0];

    document.getElementById("info").innerHTML = 'Score:  ' + Score*multiplier + '    Health:  ' + Health;
    for(i = 0; i < num_objs ; i++)
    {
        wall1[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime, light);
        wall2[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime, light);
        if(!coins[i].scored)coins[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
        tracks1[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
        tracks2[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
        tracks3[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
        enemies1[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
        // enemies1[i].rotation = -90*Math.PI/180;        
        ceils[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
        pillars[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    pl.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    leg1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    leg2.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    head.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    hand1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    hand2.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    // police.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    dog_b.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    dog_h.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    dog_l1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    dog_l2.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    dog_l3.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    dog_l4.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    dog_t.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    pol.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    pol_back.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    pol_head.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    pol_hand1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    pol_hand2.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    pol_leg1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    pol_leg2.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    train1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    train2.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    tf1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    tf2.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    won.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    if(!jet1.scored)jet1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    if(!ss1.scored) ss1.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    if(!ss2.scored) ss2.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    if(!mult2x.scored)mult2x.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    if(!Health){
        alert('Game Over!  Total Score: ' + Score);
    }
    console.log(light);

}

function loadTexture(gl, url) 
{
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);
  
    const image = new Image();
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image);
  
      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
         // Yes, it's a power of 2. Generate mips.
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {
         // No, it's not a power of 2. Turn off mips and set
         // wrapping to clamp to edge
         
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;
  
    return texture;
}
  
function isPowerOf2(value) 
{
    return (value & (value - 1)) == 0;
}

function input() {
    Mousetrap.bind(['a','left'], function() { 
        if(flag_lr > -4) flag_lr -= 4;
    }); 
    Mousetrap.bind(['d','right'], function() { 
        if(flag_lr < 4) flag_lr += 4;
    }); 
    Mousetrap.bind('space', function() { 
        if(pl.pos[1]== py) flag_j = true;
    });
    Mousetrap.bind('enter', function() {
        grey_flag = !grey_flag;
    });
    Mousetrap.bind('up', function() {
        if(light == 1) light = 0.2;
        else light = 1;
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }