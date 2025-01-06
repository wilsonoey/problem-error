package com.dicoding.asclepius.view

import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.asclepius.R
import com.dicoding.asclepius.databinding.ActivityResultBinding

class ResultActivity : AppCompatActivity() {
    private lateinit var binding: ActivityResultBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityResultBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Retrieve the data from the intent
        val imageUri = intent.getParcelableExtra<Uri>("imageUri")
        val predictionResult = intent.getStringExtra("predictionResult")
        val confidenceScore = intent.getFloatExtra("confidenceScore", 0.0f)

        // Display the image
        binding.resultImage.setImageURI(imageUri)

        // Display the prediction and confidence score
        binding.resultText.text = getString(R.string.result, predictionResult, confidenceScore)
    }
}