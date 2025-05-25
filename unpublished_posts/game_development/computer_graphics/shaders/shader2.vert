attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform vec2 uResolution;

varying vec2 pos;

void main() {
    pos = aTexCoord;

    vec4 position = vec4(aPosition, 1.0);
    // Q1: x > 0, y > 0
    if (aPosition.x > 0.0 && aPosition.y > 0.0) {
        position.x = (position.x / uResolution.x) * 2.0 - 1.0;
        position.y = (position.y / uResolution.y) * 2.0 - 1.0;
    }
    // Q2: x < 0, y > 0
    else if (aPosition.x < 0.0 && aPosition.y > 0.0) {
        position.x = (position.x / -uResolution.x) * 2.0 - 1.0;
        position.y = (position.y / uResolution.y) * 2.0 - 1.0;
    }
    // Q3: x < 0, y < 0
    else if (aPosition.x < 0.0 && aPosition.y < 0.0) {
        position.x = (position.x / -uResolution.x) * 2.0 - 1.0;;
        position.y = (position.y / -uResolution.y) * 2.0 - 1.0;
    }
    // Q4: x > 0, y < 0
    else if (aPosition.x > 0.0 && aPosition.y < 0.0) {
        position.x = (position.x / uResolution.x) * 2.0 - 1.0;
        position.y = (position.y / -uResolution.y) * 2.0 - 1.0;
    }

    gl_Position = position;
}
