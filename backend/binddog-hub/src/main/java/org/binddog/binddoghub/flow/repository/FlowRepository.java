package org.binddog.binddoghub.flow.repository;

import org.binddog.binddoghub.flow.document.Flow;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlowRepository extends MongoRepository<Flow, String> {

    void deleteByProjectIdAndId(Long projectId, String id);

}
