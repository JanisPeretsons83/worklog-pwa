class PDFExport {
    constructor() {
        this.faceDetector = null;
        this.modal = document.getElementById('face-auth-modal');
        this.canvas = document.getElementById('canvas');
        this.video = document.getElementById('video');
    }

    // Initialize modal and start video stream
    initModal() {
        this.modal.style.display = 'block';
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                this.video.srcObject = stream;
                this.faceDetector = new blazeFace.BlazeFace(); // Initialize BlazeFace
                this.faceDetector.load().then(() => this.detectFaces());
            })
            .catch(err => console.error('Error accessing camera: ', err));
    }

    // Detect faces in the video
    detectFaces() {
        setInterval(() => {
            this.faceDetector.estimateFaces(this.video).then(predictions => {
                if (predictions.length > 0) {
                    this.modal.style.display = 'none';
                    this.startPDFGeneration();
                } else {
                    console.log('No face detected');
                }
            });
        }, 100); // Check for faces every 100ms
    }

    // Start the PDF generation process
    startPDFGeneration() {
        html2pdf()
            .from(this.canvas)
            .save('export.pdf');
    }

    // Cleanup and stop video
    stopVideo() {
        const stream = this.video.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        this.video.srcObject = null;
    }
}

// Usage example:
const pdfExport = new PDFExport();
pdfExport.initModal();