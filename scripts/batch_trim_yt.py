#!/usr/bin/env python3
import os
from pathlib import Path
import re
import argparse
import subprocess


def main():
    parser = argparse.ArgumentParser(
        description='Download and crop YouTube videos from a text file'
    )
    parser.add_argument(
        'input_file',
        help='Text file with YouTube links and timestamps (3 lines per video)'
    )
    
    args = parser.parse_args()
    
    # Read the input file
    with open(args.input_file, 'r') as f:
        lines = f.readlines()

    os.mkdir('.batch_trim_yt_temp')
    
    # Process every 3 lines
    for i in range(0, len(lines), 3):
        # Extract link (first line)
        link = lines[i].strip()
        if not link:
            continue
        
        # Extract time range (second line)
        time_line = lines[i+1].strip() if i+1 < len(lines) else ""
        time_match = re.search(r'(\d+:\d+)\s*-\s*(\d+:\d+)', time_line)
 
        if time_match:
            start_time, end_time = time_match.groups()
 
            # Download video
            print(f"Downloading: {link}")
            result = subprocess.run(
                ['yt-dlp.exe', '--preset-alias', 'mp4', '-o', '.batch_trim_yt_temp/%(title)s.%(ext)s', link],
                capture_output=True,
                text=False
            )
            
            # Extract filename from folder
            # filename_match = re.search(r'Destination:\s*(batch_trim_yt_temp/.+\.mp4)', result.stdout)

            filename = Path('.batch_trim_yt_temp', os.listdir(Path('.batch_trim_yt_temp'))[0])

            # filename = re.sub(r'\W\S', '', filename_match.group(1).strip())
            # filename = filename_match.group(1).strip()
            
            # Calculate duration
            def to_seconds(t):
                m, s = map(int, t.split(':'))
                return m * 60 + s
            
            duration = to_seconds(end_time) - to_seconds(start_time)
            
            # base_name = os.path.splitext(filename)[0]
            output_file = f"{re.sub('.mp4', '', os.listdir(Path('.batch_trim_yt_temp'))[0])}_cropped.mp4"
            
            # Crop video
            subprocess.run([
                'ffmpeg',
                '-i', filename,
                '-ss', start_time,
                '-t', str(duration),
                '-c', 'copy',
                output_file
            ])
            
            print(f"Created: {output_file}")

            print(f"Deleting temp yt-dlp video")
            os.remove(filename)
        else:
            print(f"No valid time range for: {link}")
        
    os.rmdir('.batch_trim_yt_temp')


if __name__ == '__main__':
    main()