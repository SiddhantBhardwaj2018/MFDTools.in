package com.siddhantbhardwaj.mfd_tools_backend.models.business_objects;

import org.thymeleaf.context.Context;

public class EmailEvent {

    private String to;

    private String subject;

    private String templateName;

    private Context context;

    public EmailEvent(){

    }

    public EmailEvent(String to, String subject, String templateName, Context context){
        this.to=to;
        this.subject=subject;
        this.templateName=templateName;
        this.context=context;
    }

    public String getTo(){
        return to;
    }

    public String getSubject(){
        return subject;
    }

    public String getTemplateName(){
        return templateName;
    }

    public Context getContext(){
        return context;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    @Override
    public String toString() {
        return "EmailEvent{" +
                "to='" + to + '\'' +
                ", subject='" + subject + '\'' +
                ", templateName='" + templateName + '\'' +
                ", context=" + context +
                '}';
    }

}
