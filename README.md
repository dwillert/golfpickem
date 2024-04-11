# Golf Pick 'em

## Overview
Front-End Javascript Node.js application for the Golf Pickem project. This application runs on an AWS infrastructure managed by Elastic Beanstalk. A Ec2 that the Node.js app runs on is the compute for the code and connects to a target group, elastic load balancer, and route53 so that users can access the website client-side. When the Node app runs, it renders a static HTML that has javascript attached in the body. This script runs the data retrieval logic that uses the javascript aws-sdk library to contact AWS Cognito to retrieve AWS credentials, and then use those to contact AWS S3 (GetObject) to retrieve two files. One for the Picks submission data for every member, and one for the most up to date Golf score data for a given tournament. The javascript then uses that data to render the front-end. 

## Front End Screen Captures
### Laptop

### Mobile

## Architecture

## HTML

## Styling

## Javascript



