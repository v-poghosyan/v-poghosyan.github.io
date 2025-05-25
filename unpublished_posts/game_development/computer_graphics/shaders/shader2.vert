attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

void main() {
    pos = aTexCoord;

    vec4 position = vec4(aPosition, 1.0);
    position.xy = position.xy * 2.0 - 1.0; // Map the positions from the [0,1] range to the [-1,1] range

    gl_Position = position;
}