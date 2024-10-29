package org.binddog.core.properties;

import org.springdoc.core.properties.SpringDocConfigProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@ConfigurationProperties(
        prefix = "binddog"
)
@EnableConfigurationProperties
public class BindDogConfigProperties {

    private final SpringDocConfigProperties springDocConfigProperties;
    private Hub hub;
    private Local local;

    @Autowired
    public BindDogConfigProperties(SpringDocConfigProperties springDocConfigProperties) {
        this.springDocConfigProperties = springDocConfigProperties;
    }

    public SpringDocConfigProperties getSpringDocConfigProperties() {
        return springDocConfigProperties;
    }

    public Hub getHub() {
        return hub;
    }

    public void setHub(Hub hub) {
        this.hub = hub;
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public String getLocalPath() {
        return local.getPath();
    }

    /**
     * Hub Properties
     */
    static class Hub {
        //Hub Connection URI
        @Value("${binddog.hub.base-url}")
        private String path;

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            System.out.println("Hub.setPath : " + path);
            this.path = path;
        }
    }

    /**
     * Local Properties
     */
    static class Local {
        //BindDog Test GUI Path
        private String path = "/binddog/index.html";

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            System.out.println("Local.setPath : " + path);
            this.path = path;
        }
    }
}
