# S3 CORS Configuration

To enable direct uploads from the browser to S3, you need to configure CORS on your S3 bucket.

## CORS Configuration

Go to your S3 bucket → Permissions → CORS configuration and add:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "http://localhost:3000",
            "http://localhost:3002",
            "https://yourdomain.com",
            "https://admin.yourdomain.com"
        ],
        "ExposeHeaders": [
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

## Important Notes

1. Replace `yourdomain.com` with your actual domain
2. Add all domains that will upload files (frontend, admin panel)
3. Make sure `PUT` method is included in `AllowedMethods`
4. `AllowedHeaders` can be `["*"]` or specific headers like `["Content-Type", "x-amz-*"]`
5. After updating CORS, it may take a few minutes to propagate

## Testing

After configuring CORS, test the upload again. If you still get errors:
- Check browser console for specific CORS error messages
- Verify the bucket name and region are correct
- Ensure the presigned URL is being used correctly (PUT method, correct Content-Type)



