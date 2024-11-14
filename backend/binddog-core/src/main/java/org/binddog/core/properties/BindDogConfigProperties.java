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
    private Hub hub = new Hub();
    private Local local = new Local();
    private static final String HUB_BASE_URL = "https://api.binddog.org";
    private static final String LOCAL_BASE_URL = "/binddog-ui/index.html";


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
        private String path = HUB_BASE_URL;

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }
    }

    /**
     * Local Properties
     */
    static class Local {
        //BindDog Test GUI Path
        private String path = LOCAL_BASE_URL;

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }
    }
}
