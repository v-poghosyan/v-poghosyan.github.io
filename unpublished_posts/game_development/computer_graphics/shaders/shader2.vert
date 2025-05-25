attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform vec2 uResolution;

varying vec2 pos;

void main() {
    pos = aTexCoord;

    vec4 position = vec4(aPosition, 1.0);
    position.x = (position.x / uResolution.x) * 2.0 - 1.0;
    position.y = (position.y / uResolution.y) * 2.0 - 1.0;
    gl_Position = position;
}
