import os
import time
import tensorflow as tf
import numpy as np
import cv2

CLASSES = ["FRONT", "BACK", "LEFT", "RIGHT", "TOP", "BOTTOM", "UNCLEAR"]


class ImageClassifier:
    def __init__(self, model_path: str = None):
        self.model = None
        self.model_path = model_path

        if model_path and os.path.exists(model_path):
            try:
                started = time.perf_counter()
                self.model = tf.keras.models.load_model(model_path, compile=False)
                print(
                    f"[CNN] Model loaded in "
                    f"{time.perf_counter() - started:.2f}s: {model_path}"
                )
            except Exception as exc:
                print(f"[CNN] Failed to load model: {exc}")
        else:
            print(f"[CNN] Model not found; using UNCLEAR fallback: {model_path}")

    def classify(self, image_bytes: bytes) -> dict:
        if self.model is None:
            return {"predicted_class": "UNCLEAR", "confidence": 0.0}

        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            return {
                "predicted_class": "UNCLEAR",
                "confidence": 0.0,
                "error": "Invalid image",
            }

        img = cv2.resize(img, (224, 224), interpolation=cv2.INTER_AREA)
        img = img.astype(np.float32) / 255.0
        img = np.expand_dims(img, axis=0)

        started = time.perf_counter()
        predictions = self.model.predict(img, verbose=0)
        elapsed = time.perf_counter() - started

        pred_index = int(np.argmax(predictions[0]))
        confidence = float(predictions[0][pred_index])

        print(
            f"[CNN] {CLASSES[pred_index]} "
            f"{confidence:.3f} in {elapsed:.2f}s"
        )

        return {
            "predicted_class": CLASSES[pred_index],
            "confidence": confidence,
        }


# The model is actually inside app/models/saved_models in this project.
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "saved_models",
    "cnn_model.keras",
)

classifier = ImageClassifier(MODEL_PATH)


def classify_image(image_bytes: bytes) -> dict:
    return classifier.classify(image_bytes)
