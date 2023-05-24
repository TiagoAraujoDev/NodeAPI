import { Readable, Transform, Writable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      const buf = Buffer.from(`${String(i)}\n`);

      this.push(buf);
    }
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformedChunk = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformedChunk)));
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
