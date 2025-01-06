package com.dicoding.asclepius.helper

import android.content.Context
import android.graphics.Bitmap
import android.graphics.ImageDecoder
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.task.vision.classifier.ImageClassifier
import org.tensorflow.lite.task.vision.classifier.ImageClassifier.ImageClassifierOptions
import org.tensorflow.lite.support.common.FileUtil
import java.io.File

class ImageClassifierHelper(private val context: Context) {

    private lateinit var imageClassifier: ImageClassifier

    init {
        setupImageClassifier()
    }

    private fun setupImageClassifier() {
        // Initialize the TensorFlow Lite model
        val modelFile = File(context.filesDir, "cancer_classification.tflite")
        val options = ImageClassifierOptions.builder()
            .setMaxResults(1)
            .build()
        imageClassifier = ImageClassifier.createFromFileAndOptions(modelFile, options)
    }

    fun classifyStaticImage(imageUri: Uri): Pair<String, Float> {
        val bitmap = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            val source = ImageDecoder.createSource(context.contentResolver, imageUri)
            ImageDecoder.decodeBitmap(source)
        } else {
            MediaStore.Images.Media.getBitmap(context.contentResolver, imageUri)
        }.copy(Bitmap.Config.ARGB_8888, true)

        val tensorImage = TensorImage.fromBitmap(bitmap)
        val results = imageClassifier.classify(tensorImage)
        val prediction = results[0].categories[0].label
        val confidenceScore = results[0].categories[0].score
        return Pair(prediction, confidenceScore)
    }
}