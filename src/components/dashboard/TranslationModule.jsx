
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Webcam, Play, Square, MessageSquareText, Loader2 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

export const TranslationModule = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startWebcam = async () => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setIsLoading(false);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // In a real app, we would stop the ISL detection here
    } else {
      // Start recording
      setIsRecording(true);
      // In a real app, we would start the ISL detection here
      simulateDetection();
    }
  };

  // This is a mock function to simulate text detection
  // In a real application, this would be replaced with actual sign language detection
  const simulateDetection = () => {
    const phrases = [
      "Hello, how are you?",
      "My name is Sign Scribe",
      "Nice to meet you",
      "Thank you for using Sign Scribe",
      "This is a demonstration of ISL to text translation"
    ];
    
    const interval = setInterval(() => {
      if (!isRecording) {
        clearInterval(interval);
        return;
      }
      
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setDetectedText(randomPhrase);
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  };

  useEffect(() => {
    startWebcam();
    
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Webcam Feed Card */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webcam className="h-5 w-5" />
            Webcam Feed
          </CardTitle>
          <CardDescription>
            Live camera feed for sign language detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            {isRecording && (
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                Recording
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isRecording ? (
                <>
                  <Square className="h-4 w-4" />
                  Stop Translation
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Translation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detected Text Card */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareText className="h-5 w-5" />
            Detected Text
          </CardTitle>
          <CardDescription>
            Sign language translation results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4 min-h-[250px] flex items-center justify-center bg-white">
            {isRecording ? (
              detectedText ? (
                <p className="text-lg">{detectedText}</p>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <Loader2 className="h-6 w-6 animate-spin mb-2" />
                  <p>Waiting for sign language detection...</p>
                </div>
              )
            ) : (
              <p className="text-gray-500 text-center">
                Press "Start Translation" to begin detecting sign language
              </p>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Note:</strong> This is a demo version. Actual sign language detection 
              would require implementing a machine learning model for ISL recognition.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
