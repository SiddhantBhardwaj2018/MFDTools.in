package com.siddhantbhardwaj.mfd_tools_backend.utils.events;

import com.siddhantbhardwaj.mfd_tools_backend.models.business_objects.EmailEvent;
import com.siddhantbhardwaj.mfd_tools_backend.utils.events.event_objects.EmailSendingEvent;
import com.siddhantbhardwaj.mfd_tools_backend.utils.events.event_objects.FileWithAttachment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;

@Component
public class MFDToolsEventPublisher {

    private static final Logger mfdToolsEventPublisherLogger = LoggerFactory.getLogger(MFDToolsEventPublisher.class);

    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public MFDToolsEventPublisher(ApplicationEventPublisher applicationEventPublisher){
        this.applicationEventPublisher = applicationEventPublisher;
    }

    public void publishEmailEvent(String to, String subject, String templateName, Context context){
        mfdToolsEventPublisherLogger.info("Entering {} method with to {} and subject {} and templateName {} and context {}",Thread.currentThread().getStackTrace()[2].getMethodName(),to,subject,templateName,context);
        EmailEvent emailEvent = new EmailEvent(to, subject, templateName, context);
        EmailSendingEvent emailSendingEvent = new EmailSendingEvent(emailEvent);
        mfdToolsEventPublisherLogger.info("Publishing Email With Email Event {}",Thread.currentThread().getStackTrace()[2].getMethodName(),emailEvent);
        applicationEventPublisher.publishEvent(emailSendingEvent);
    }

    public void sendFileWithAttachment(FileWithAttachment fileWithAttachment){
        mfdToolsEventPublisherLogger.info("Entering {} method with fileWithAttachment {}",Thread.currentThread().getStackTrace()[2].getMethodName(),fileWithAttachment);
        applicationEventPublisher.publishEvent(fileWithAttachment);
    }

}
