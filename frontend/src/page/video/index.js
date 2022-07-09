export default function Video() {
  return (
    <div>
      <div>
        <video width="500px" height="600px" controls>
          <source type="video/mp4" src="/static/ab.mp4"></source>
        </video>
      </div>
      <div>
        THIS IS FOOTER
      </div>
    </div>
  );
}
