package org.binddog.core.annotation;

public class BlockInfo {
    private String blockName;
    private String status;

    public BlockInfo(Builder builder) {
        this.blockName = builder.blockName;
        this.status = builder.status;
    }

    public String getBlockName() {
        return blockName;
    }

    public String getStatus() {
        return status;
    }

    // Builder 클래스 정의
    public static class Builder {
        private String blockName;
        private String status;

        public Builder blockName(String blockName) {
            this.blockName = blockName;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public BlockInfo build() {
            return new BlockInfo(this);
        }
    }

}
