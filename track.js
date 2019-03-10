let Track = class {
    constructor(gl,pos,texture,l,b,h) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.texture = texture
        this.len = l;
        this.breadth = b;
        this.height = h;
        this.positions = [

            this.breadth,  this.height,  this.len, //2
           -this.breadth,  this.height,  this.len, //1
            this.breadth, -this.height,  this.len, //3
           -this.breadth, -this.height,  this.len, //4 

            this.breadth,  this.height, -this.len, //6
           -this.breadth,  this.height, -this.len, //5
            this.breadth, -this.height, -this.len, //7
           -this.breadth, -this.height, -this.len, //8 

            this.breadth,  this.height,  this.len, //2
            this.breadth,  this.height, -this.len, //6
            this.breadth, -this.height,  this.len, //3
            this.breadth, -this.height, -this.len, //7 

           -this.breadth,  this.height,  this.len, //1 
           -this.breadth,  this.height, -this.len, //5
           -this.breadth, -this.height,  this.len, //4
           -this.breadth, -this.height, -this.len, //8

            this.breadth,  this.height,  this.len, //2
            this.breadth,  this.height, -this.len, //6
           -this.breadth,  this.height,  this.len, //1 
           -this.breadth,  this.height, -this.len, //5 

            this.breadth, -this.height,  this.len, //3
            this.breadth, -this.height, -this.len, //7
           -this.breadth, -this.height,  this.len, //4
           -this.breadth, -this.height, -this.len, //8

        ];
        this.rotation = 90*Math.PI/180;
        this.pos = pos;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
      
        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    
        this.vertexNormals = [
        // Front
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
    
        // Back
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
    
        // Right
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
    
            // Left
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
        // Top
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
    
        // Bottom
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0
    
        ];
    
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals),
                    gl.STATIC_DRAW);
      
        this.textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        this.textureCoordinates = [
            0.0,  0.0,
            1.0,  1.0,
            1.0,  0.0,
            0.0,  1.0,
            // Back
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Top
            1.0,  0.0,
            1.0,  1.0,
            0.0,  0.0,
            0.0,  1.0,
            // Bottom
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Right
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            // Left
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            
        ];
      
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates),
                      gl.STATIC_DRAW);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        this.indices = [
            0,  1,  2,  3,  1,  2,        // front
            4,  5,  6,  7,  5,  6,        // front
            8,  9,  10, 11, 9,  10,        // front
            12, 13, 14, 15, 13, 14,        // front
            16, 17, 18, 19, 17, 18,        // front
            20, 21, 22, 23, 21, 22,        // front
        ];

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(this.indices), gl.STATIC_DRAW);

        this.buffers = {
            position: this.positionBuffer,
            normal: this.normalBuffer,
            tex : this.textureCoordBuffer,
            indices: this.indexBuffer,
        }

    }

    drawObject(gl, projectionMatrix, programInfo,deltaTime) {
        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,         // destination matrix
            modelViewMatrix,         // matrix to translate
            this.pos
        );    // amount to translate

        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [0,0,1]);

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
            gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexPosition,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
            gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexPosition);
        }
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexNormal);
        }
        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.tex);
            gl.vertexAttribPointer(
                    programInfo.attribLocations.textureCoord,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
            gl.enableVertexAttribArray(
                    programInfo.attribLocations.textureCoord);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
                programInfo.uniformLocations.projectionMatrix,
                false,
                projectionMatrix);
        gl.uniformMatrix4fv(
                programInfo.uniformLocations.modelViewMatrix,
                false,
                modelViewMatrix);
        gl.uniformMatrix4fv(
                programInfo.uniformLocations.normalMatrix,
                false,
                normalMatrix);

        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
        // this.rotation += deltaTime;
    }
};