let Coin = class {
    constructor(gl,pos,texture,r,l) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.texture = texture;
        this.scored = false;
        this.len = l;
        this.positions = [];
        var i;
        var n = 50;
        var theta = 2*3.14159/n;
        this.radius = r;

        for(i=0; i<50; i++)
        {
            var angleBefore = theta * (180 + i);
            var angle = angleBefore + theta;
            // console.log(i);
            this.positions.push(this.radius * Math.cos(angleBefore));
            this.positions.push(this.radius * Math.sin(angleBefore));
            this.positions.push(this.len);
            this.positions.push(this.radius * Math.cos(angle));
            this.positions.push(this.radius * Math.sin(angle));
            this.positions.push(this.len);
            this.positions.push(this.radius * Math.cos(angleBefore));
            this.positions.push(this.radius * Math.sin(angleBefore));
            this.positions.push(0);
        }
        for(i = 0;i < 50; i++)
        {
            var angleBefore = theta * (180 + i);
            var angle = angleBefore + theta;
            this.positions.push(this.radius * Math.cos(angleBefore));
            this.positions.push(this.radius * Math.sin(angleBefore));
            this.positions.push(0);
            this.positions.push(this.radius * Math.cos(angle));
            this.positions.push(this.radius * Math.sin(angle));
            this.positions.push(0);
            this.positions.push(this.radius * Math.cos(angle));
            this.positions.push(this.radius * Math.sin(angle));
            this.positions.push(this.len);
        }
        for(i=0;i<50;i++)
        {
            var angleBefore = theta * (180 + i);
            var angle = angleBefore + theta;
            this.positions.push(0);
            this.positions.push(0);
            this.positions.push(0);
            this.positions.push(this.radius * Math.cos(angleBefore));
            this.positions.push(this.radius * Math.sin(angleBefore));
            this.positions.push(0);
            this.positions.push(this.radius * Math.cos(angle));
            this.positions.push(this.radius * Math.sin(angle));
            this.positions.push(0);
        }
        for(i=0;i<50;i++)
        {
            var angleBefore = theta * (180 + i);
            var angle = angleBefore + theta;
    
            this.positions.push(0);
            this.positions.push(0);
            this.positions.push(this.len);
            this.positions.push(this.radius * Math.cos(angleBefore));
            this.positions.push(this.radius * Math.sin(angleBefore));
            this.positions.push(this.len);
            this.positions.push(this.radius * Math.cos(angle));
            this.positions.push(this.radius * Math.sin(angle));
            this.positions.push(this.len);
        }
        this.rotation = 0;
        this.pos = pos;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
       
        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    
        this.vertexNormals = [];
        for(i=0; i<50; i++)
        {
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
        }
        for(i=0;i<50;i++)
        {
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(-1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(-1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(-1);
        }
        for(i=0;i<50;i++)
        {
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
            this.vertexNormals.push(0);
            this.vertexNormals.push(0);
            this.vertexNormals.push(1);
        }
       
        this.textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        this.texCoords = [];
      
        for(i=0;i<50;i++)
        {
            this.texCoords.push(0.8, 0.8);
            this.texCoords.push(0.8, 0.8);
            this.texCoords.push(0.8, 0.8);
        }
        for(i=0;i<50;i++)
        {
            this.texCoords.push(0.8, 0.8);
            this.texCoords.push(0.8, 0.8);
            this.texCoords.push(0.8, 0.8);
        }
        
        for(i=0;i<50;i++)
        {
            var angleBefore = theta * (180 + i);
            var angle = angleBefore + theta;
            this.texCoords.push(0.5, 0.5);
            this.texCoords.push(0.5-0.48*Math.cos(angleBefore));
            this.texCoords.push(0.5-0.48*Math.sin(angleBefore));
            this.texCoords.push(0.5-0.48*Math.cos(angle));
            this.texCoords.push(0.5-0.48*Math.sin(angle));
        }
        for(i=0;i<50;i++)
        {
            var angleBefore = theta * (180 + i);
            var angle = angleBefore + theta;
            this.texCoords.push(0.5, 0.5);
            this.texCoords.push(0.5-0.48*Math.cos(angleBefore));
            this.texCoords.push(0.5-0.48*Math.sin(angleBefore));
            this.texCoords.push(0.5-0.48*Math.cos(angle));
            this.texCoords.push(0.5-0.48*Math.sin(angle));
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords),
                      gl.STATIC_DRAW);


        this.buffers = {
            position: this.positionBuffer,
            tex : this.textureCoordBuffer,
            normal: this.normalBuffer,
            // indices: this.indexBuffer,
        }

    }

    drawObject(gl, projectionMatrix, programInfo,deltaTime) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,         // destination matrix
            modelViewMatrix,         // matrix to translate
            this.pos
        );
        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);
        
        // amount to translate
        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [0,1,0]);
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
            // gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
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

        gl.useProgram(programInfo.program);
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
            gl.drawArrays(gl.TRIANGLES, 0, this.positions.length/3);
            // gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
        this.rotation += deltaTime;

    }
};