package com.siddhantbhardwaj.mfd_tools_backend.utils;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
public class EmailSenderApp {

    private static final Logger emailSenderAppLogger = LoggerFactory.getLogger(EmailSenderApp.class);

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmail(String to, String subject, String body){
        emailSenderAppLogger.info("Entering {} method with to {} and subject {} and body {}",Thread.currentThread().getStackTrace()[2].getMethodName(),to,subject,body);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        emailSender.send(message);
    }

    public void sendEmailWithTemplate(String to, String subject, String templateName, Context context) throws Exception {
        emailSenderAppLogger.info("Entering {} method with to {} and subject {} and templateName {} and context {}",Thread.currentThread().getStackTrace()[2].getMethodName(),to,subject,templateName,context);
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try{
            helper.setTo(to);
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName,context);
            helper.setText(htmlContent,true);
            emailSender.send(mimeMessage);
        }catch (final Exception e){
            emailSenderAppLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
    }

    public void sendEmailWithAttachment(String to, String subject, String templateName, Context context,byte[] fileData, String fileName) throws Exception {
        emailSenderAppLogger.info("Entering {} method with to {} and subject {} and templateName {} and context {} and fileData {} and fileName {}",Thread.currentThread().getStackTrace()[2].getMethodName(),to,subject,templateName,context,fileData,fileName);
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        try{
            helper.setTo(to);
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName,context);
            helper.setText(htmlContent,true);
            InputStreamSource attachmentSource = new ByteArrayResource(fileData);
            helper.addAttachment(fileName, attachmentSource);
            emailSender.send(mimeMessage);
        }catch (final Exception e){
            emailSenderAppLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
    }

}
