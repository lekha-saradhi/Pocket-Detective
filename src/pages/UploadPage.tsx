import TextInput from "../components/TextInput";
import ImageUploader from "../components/ImageUploader";
import QRUploader from "../components/QRUploader";

function UploadPage() {
  return (
    <div>
      <h1>Pocket Detective</h1>

      <TextInput />

      <ImageUploader />

      <QRUploader />
    </div>
  );
}

export default UploadPage;